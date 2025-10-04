"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Camera, Users, DollarSign, ChevronLeft, ChevronRight, Calculator } from 'lucide-react';
import ImageViewer from './ImageViewer';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

const TheKeoApp = () => {
  const [bills, setBills] = useState([
    {
      id: 1,
      title: "#TheKeo1-LyKyQuan",
      amount: 1577,
      amountPerPerson: 1577 / 2, // Split between You and Thanh Tran
      payments: {
        // 'Luân': 1577 - 300,
        'Thanh Tran': 300 // Already paid 300k
      },
      paidBy: 'Thành Trần',
      splitBetween: ['Luân', 'Thành Trần'],
      date: new Date().toLocaleDateString('vi-VN'),
      imageUrl: "/Keo1/img.png",
      images: ["/Keo1/img.png", "/Keo1/img_1.png", "/Keo1/img_2.png"]
    }
  ]);
  const [friends, setFriends] = useState(['Luân', 'Thành Trần']);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [showAddBill, setShowAddBill] = useState(false);
  const [imageViewer, setImageViewer] = useState({ show: false, images: [], currentIndex: 0 });
  const [calculator, setCalculator] = useState({ totalBill: '', numDrinkers: '' });
  const [imageLoading, setImageLoading] = useState({});
  const [newBill, setNewBill] = useState({
    title: '',
    amount: '',
    image: null,
    imageUrl: '',
    paidBy: 'Luân',
    splitBetween: ['Luân'],
    payments: {}
  });
  const [transactions, setTransactions] = useState([]);
  const scrollContainerRef = useRef(null);

  const fetchPaymentsFromAPI = async () => {
    try {
      const response = await fetch('https://go-transaction-api-wqzlk.sevalla.app/api/v1/transactions');
      const data = await response.json();
      
      if (data && data.transactions && Array.isArray(data.transactions)) {
        setTransactions(data.transactions);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  useEffect(() => {
    fetchPaymentsFromAPI();
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current && transactions.length > 0) {
      const ps = new PerfectScrollbar(scrollContainerRef.current, {
        wheelSpeed: 1,
        wheelPropagation: true,
        minScrollbarLength: 20,
        suppressScrollX: true
      });

      return () => {
        ps.destroy();
      };
    }
  }, [transactions]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewBill(prev => ({
          ...prev,
          image: file,
          imageUrl: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  const toggleFriendInSplit = (friend) => {
    setNewBill(prev => {
      const splitBetween = prev.splitBetween.includes(friend)
        ? prev.splitBetween.filter(f => f !== friend)
        : [...prev.splitBetween, friend];
      return { ...prev, splitBetween };
    });
  };

  const addBill = () => {
      alert('chƯa code xong, hẹ hẹ hẹ')
      return

    if (!newBill.title || !newBill.amount) return;
    
    const amountPerPerson = parseFloat(newBill.amount) / newBill.splitBetween.length;
    const payments = {};
    
    newBill.splitBetween.forEach(person => {
      payments[person] = person === newBill.paidBy ? 0 : amountPerPerson;
    });

    const bill = {
      id: Date.now(),
      ...newBill,
      amount: parseFloat(newBill.amount),
      amountPerPerson,
      payments,
      date: new Date().toLocaleDateString('vi-VN')
    };

    setBills([...bills, bill]);
    setNewBill({
      title: '',
      amount: '',
      image: null,
      imageUrl: '',
      paidBy: 'Luân',
      splitBetween: ['Luân'],
      payments: {}
    });
    setShowAddBill(false);
  };

  const updatePayment = (billId, person, amount) => {
    setBills(bills.map(bill => {
      if (bill.id === billId) {
        return {
          ...bill,
          payments: {
            ...bill.payments,
            [person]: Math.max(0, bill.payments[person] - parseFloat(amount || 0))
          }
        };
      }
      return bill;
    }));
  };


  const getTotalOwed = (person) => {
    return bills.reduce((total, bill) => total + (bill.payments[person] || 0), 0);
  };

  const nextImage = (billId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [billId]: ((prev[billId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (billId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [billId]: ((prev[billId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  return (
    <div className="h-full p-6 overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2 font-['Poppins'] flex items-center justify-center">
          <div style={{ height: 100, width: 150, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="/logo/logo.png"
              alt="logo"
              width={150}
              style={{ height: 100, objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        </h1>
        {/*<p className="text-white/70 text-sm">Quản lý chi tiêu và nhậu nhẹt với bạn bè!</p>*/}

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-[#8b5cf6]" />
            <span className="text-xs font-medium">Tổng Bill</span>
          </div>
          <div className="text-lg font-bold">
            {bills.reduce((sum, bill) => sum + bill.amount, 0).toLocaleString()}k
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-[#10b981]" />
            <span className="text-xs font-medium">Chia Bill</span>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-white/90 leading-relaxed">
              Có{' '}
              <input
                type="number"
                min="1"
                max="10"
                value={calculator.numDrinkers}
                onChange={(e) => {
                  const value = Math.max(0, Math.min(10, parseInt(e.target.value) || 0));
                  setCalculator(prev => ({ ...prev, numDrinkers: value.toString() }));
                }}
                className="w-8 bg-white/20 text-white text-center text-xs p-0 border border-white/30 outline-none focus:border-[#10b981] rounded mx-1"
              />
              em say sỉn
            </div>
            {calculator.numDrinkers && calculator.numDrinkers !== '0' && (
              <div className="text-xs text-white/90 leading-relaxed">
                mỗi em góp{' '}
                <span className="font-bold text-[#10b981]">
                  {Math.round(bills.reduce((sum, bill) => sum + bill.amount, 0) / parseFloat(calculator.numDrinkers)).toLocaleString()}
                </span> 🐟
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Friends Management */}
      {/*<div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 border border-white/20">*/}
      {/*  <div className="flex items-center justify-between mb-3">*/}
      {/*    <h3 className="text-white font-medium text-sm">Bạn Bè</h3>*/}
      {/*    <button*/}
      {/*      onClick={addFriend}*/}
      {/*      className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white p-1 rounded-lg transition-colors"*/}
      {/*    >*/}
      {/*      <Plus className="w-4 h-4" />*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*  <div className="flex flex-wrap gap-2">*/}
      {/*    {friends.map(friend => (*/}
      {/*      <div key={friend} className="bg-white/20 text-white px-2 py-1 rounded-full text-xs">*/}
      {/*        {friend} {getTotalOwed(friend) > 0 && (*/}
      {/*          <span className="text-[#f59e0b]">(-{getTotalOwed(friend).toLocaleString()}k)</span>*/}
      {/*        )}*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/* Add Bill Button */}
      {!showAddBill && (
        <button
          onClick={() => setShowAddBill(true)}
          className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] hover:from-[#7c3aed] hover:to-[#db2777] text-white p-3 rounded-lg mb-4 flex items-center justify-center gap-2 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Thêm Bill Mới
        </button>
      )}

      {/* Add Bill Form */}
      {showAddBill && (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 border border-white/20">
          <h3 className="text-white font-medium mb-3 text-sm">Thêm Bill Mới</h3>
          
          <input
            type="text"
            placeholder="Tên bill (VD: Ăn tối quán Pizza)"
            value={newBill.title}
            onChange={(e) => setNewBill(prev => ({ ...prev, title: e.target.value }))}
            className="w-full bg-white/10 text-white placeholder-white/60 p-2 rounded-lg mb-3 border border-white/20 outline-none text-sm focus:border-[#8b5cf6]"
          />
          
          <input
            type="number"
            placeholder="Tổng tiền"
            value={newBill.amount}
            onChange={(e) => setNewBill(prev => ({ ...prev, amount: e.target.value }))}
            className="w-full bg-white/10 text-white placeholder-white/60 p-2 rounded-lg mb-3 border border-white/20 outline-none text-sm focus:border-[#8b5cf6]"
          />

          {/* Image Upload */}
          <div className="mb-3">
            <label className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg cursor-pointer transition-colors border border-white/20 text-sm">
              <Camera className="w-4 h-4" />
              {newBill.image ? 'Đổi Ảnh' : 'Thêm Ảnh'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {newBill.imageUrl && (
              <img src={newBill.imageUrl} alt="Bill" className="w-full h-24 object-cover rounded-lg mt-2" />
            )}
          </div>

          {/* Who Paid */}
          <select
            value={newBill.paidBy}
            onChange={(e) => setNewBill(prev => ({ ...prev, paidBy: e.target.value }))}
            className="w-full bg-white/10 text-white p-2 rounded-lg mb-3 border border-white/20 outline-none text-sm focus:border-[#8b5cf6]"
          >
            {friends.map(friend => (
              <option key={friend} value={friend} className="bg-[#0f0f23] text-white">
                {friend} đã trả
              </option>
            ))}
          </select>

          {/* Split Between */}
          <div className="mb-4">
            <p className="text-white/70 text-xs mb-2">Chia cho:</p>
            <div className="flex flex-wrap gap-2">
              {friends.map(friend => (
                <button
                  key={friend}
                  onClick={() => toggleFriendInSplit(friend)}
                  className={`px-2 py-1 rounded-full text-xs transition-colors ${
                    newBill.splitBetween.includes(friend)
                      ? 'bg-[#8b5cf6] text-white'
                      : 'bg-white/20 text-white/70'
                  }`}
                >
                  {friend}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={addBill}
              className="flex-1 bg-[#10b981] text-white font-medium p-2 rounded-lg hover:bg-[#059669] transition-colors text-sm"
            >
              Thêm Bill
            </button>
            <button
              onClick={() => setShowAddBill(false)}
              className="px-4 bg-white/20 text-white p-2 rounded-lg hover:bg-white/30 transition-colors text-sm"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* Bills List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {bills.map(bill => (
          <div key={bill.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="mb-2">
              <h4 className="text-white font-medium text-sm">{bill.title}</h4>
              <p className="text-white/60 text-xs">{bill.date}</p>
            </div>

            {bill.images && bill.images.length > 0 && (
              <div className="relative mb-2">
                {/* Loading skeleton */}
                {imageLoading[`${bill.id}-${currentImageIndex[bill.id] || 0}`] && (
                  <div className="absolute inset-0 bg-white/5 rounded-lg animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}

                <img
                  src={bill.images[currentImageIndex[bill.id] || 0]}
                  alt="Bill"
                  className={`w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-all duration-300 ${
                    imageLoading[`${bill.id}-${currentImageIndex[bill.id] || 0}`] ? 'opacity-0 blur-sm' : 'opacity-100'
                  }`}
                  onClick={() => setImageViewer({
                    show: true,
                    images: bill.images,
                    currentIndex: currentImageIndex[bill.id] || 0
                  })}
                  onLoadStart={() => setImageLoading(prev => ({ ...prev, [`${bill.id}-${currentImageIndex[bill.id] || 0}`]: true }))}
                  onLoad={() => setImageLoading(prev => ({ ...prev, [`${bill.id}-${currentImageIndex[bill.id] || 0}`]: false }))}
                  onError={() => setImageLoading(prev => ({ ...prev, [`${bill.id}-${currentImageIndex[bill.id] || 0}`]: false }))}
                />
                {bill.images.length > 1 && (
                  <>
                    <button
                      onClick={() => prevImage(bill.id, bill.images.length)}
                      className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => nextImage(bill.id, bill.images.length)}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-3 h-3" />
                    </button>
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {bill.images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 rounded-full ${
                            index === (currentImageIndex[bill.id] || 0)
                              ? 'bg-white'
                              : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="mb-2">
              <div className="flex justify-between text-white text-xs mb-1">
                <span>Tổng: {bill.amount.toLocaleString()}k</span>

                  {/*<span>Mỗi người: {bill.amountPerPerson.toLocaleString()}k</span>*/}
              </div>
              {/*<p className="text-white/60 text-xs">Đã trả: {bill.paidBy}</p>*/}
            </div>

            {/* Payment Status */}
            <div className="space-y-1">
              {/*<p className="text-white/80 text-xs font-medium">Các nhà hảo tâm:</p>*/}
              {/*{Object.entries(bill.payments).map(([person, amount]) => (*/}
              {/*  <div key={person} className="flex items-center justify-between">*/}
              {/*    <span className="text-white text-xs">{person}</span>*/}
              {/*      <div className="flex items-center">*/}
              {/*          <span className="text-[#f59e0b] text-xs">+{amount.toLocaleString()}k</span>*/}
              {/*      </div>*/}
              {/*    /!*{amount > 0 ? (*!/*/}
              {/*    /!*  <div className="flex items-center gap-2">*!/*/}
              {/*    /!*    <span className="text-[#f59e0b] text-xs">Nợ: {amount.toLocaleString()}k</span>*!/*/}
              {/*    /!*    <input*!/*/}
              {/*    /!*      type="number"*!/*/}
              {/*    /!*      placeholder="Đã trả"*!/*/}
              {/*    /!*      className="w-12 bg-white/10 text-white text-xs p-1 rounded border border-white/20 outline-none focus:border-[#8b5cf6]"*!/*/}
              {/*    /!*      onBlur={(e) => updatePayment(bill.id, person, e.target.value)}*!/*/}
              {/*    /!*    />*!/*/}
              {/*    /!*  </div>*!/*/}
              {/*    /!*) : (*!/*/}
              {/*    /!*  <span className="text-[#10b981] text-xs">✓ Xong rồi</span>*!/*/}
              {/*    /!*)}*!/*/}
              {/*  </div>*/}
              {/*))}*/}
            </div>
          </div>
        ))}
      </div>

      {bills.length === 0 && (
        <div className="text-center text-white/60 py-8">
          <div className="text-3xl mb-2">🍺</div>
          <p className="text-sm">Chưa có bill nào! Thêm cái đầu tiên đi nào.</p>
        </div>
      )}

      {/* Transactions Section */}
      {transactions.length > 0 && (
        <div className="mt-6 transition-opacity duration-700 animate-in fade-in">
          <h3 className="text-white font-medium mb-3 text-sm">Các nhà hảo tâm </h3>
          <div ref={scrollContainerRef} className="space-y-2 max-h-64 overflow-hidden relative">
            {transactions.map((transaction) => (
              <div
                key={transaction.ID}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[#10b981] font-medium text-sm">{transaction.AmountRaw}</span>
                  <span className="text-white/60 text-xs">
                    {new Date(transaction.TransactionDate).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <p className="text-white text-xs leading-relaxed">{transaction.Description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Viewer Modal */}
      {imageViewer.show && (
        <ImageViewer
          images={imageViewer.images}
          currentIndex={imageViewer.currentIndex}
          onClose={() => setImageViewer({ show: false, images: [], currentIndex: 0 })}
          onIndexChange={(index) => setImageViewer(prev => ({ ...prev, currentIndex: index }))}
        />
      )}
    </div>
  );
};

export default TheKeoApp;