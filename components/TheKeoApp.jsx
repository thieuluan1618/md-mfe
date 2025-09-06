"use client";

import React, { useState } from 'react';
import { Plus, Camera, Users, DollarSign, Trash2 } from 'lucide-react';

const TheKeoApp = () => {
  const [bills, setBills] = useState([]);
  const [friends, setFriends] = useState(['You', 'Friend 1', 'Friend 2']);
  const [showAddBill, setShowAddBill] = useState(false);
  const [newBill, setNewBill] = useState({
    title: '',
    amount: '',
    image: null,
    imageUrl: '',
    paidBy: 'You',
    splitBetween: ['You'],
    payments: {}
  });

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

  const addFriend = () => {
    const name = prompt('Enter friend name:');
    if (name && !friends.includes(name)) {
      setFriends([...friends, name]);
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
      date: new Date().toLocaleDateString()
    };

    setBills([...bills, bill]);
    setNewBill({
      title: '',
      amount: '',
      image: null,
      imageUrl: '',
      paidBy: 'You',
      splitBetween: ['You'],
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

  const deleteBill = (billId) => {
    setBills(bills.filter(bill => bill.id !== billId));
  };

  const getTotalOwed = (person) => {
    return bills.reduce((total, bill) => total + (bill.payments[person] || 0), 0);
  };

  return (
    <div className="h-full p-6 overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2 font-['Poppins']">🍻 TheKeo</h1>
        <p className="text-white/70 text-sm">Track your bills & drinks with friends!</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-[#8b5cf6]" />
            <span className="text-xs font-medium">Total Bills</span>
          </div>
          <div className="text-lg font-bold">
            ${bills.reduce((sum, bill) => sum + bill.amount, 0).toFixed(2)}
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-[#ec4899]" />
            <span className="text-xs font-medium">You Owe</span>
          </div>
          <div className="text-lg font-bold text-[#ef4444]">
            ${getTotalOwed('You').toFixed(2)}
          </div>
        </div>
      </div>

      {/* Friends Management */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 border border-white/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium text-sm">Friends</h3>
          <button
            onClick={addFriend}
            className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white p-1 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {friends.map(friend => (
            <div key={friend} className="bg-white/20 text-white px-2 py-1 rounded-full text-xs">
              {friend} {getTotalOwed(friend) > 0 && (
                <span className="text-[#f59e0b]">(-${getTotalOwed(friend).toFixed(2)})</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Bill Button */}
      {!showAddBill && (
        <button
          onClick={() => setShowAddBill(true)}
          className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] hover:from-[#7c3aed] hover:to-[#db2777] text-white p-3 rounded-lg mb-4 flex items-center justify-center gap-2 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add New Bill
        </button>
      )}

      {/* Add Bill Form */}
      {showAddBill && (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 border border-white/20">
          <h3 className="text-white font-medium mb-3 text-sm">Add New Bill</h3>
          
          <input
            type="text"
            placeholder="Bill title (e.g., Dinner at Pizza Place)"
            value={newBill.title}
            onChange={(e) => setNewBill(prev => ({ ...prev, title: e.target.value }))}
            className="w-full bg-white/10 text-white placeholder-white/60 p-2 rounded-lg mb-3 border border-white/20 outline-none text-sm focus:border-[#8b5cf6]"
          />
          
          <input
            type="number"
            placeholder="Total amount"
            value={newBill.amount}
            onChange={(e) => setNewBill(prev => ({ ...prev, amount: e.target.value }))}
            className="w-full bg-white/10 text-white placeholder-white/60 p-2 rounded-lg mb-3 border border-white/20 outline-none text-sm focus:border-[#8b5cf6]"
          />

          {/* Image Upload */}
          <div className="mb-3">
            <label className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg cursor-pointer transition-colors border border-white/20 text-sm">
              <Camera className="w-4 h-4" />
              {newBill.image ? 'Change Photo' : 'Add Photo'}
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
                {friend} paid
              </option>
            ))}
          </select>

          {/* Split Between */}
          <div className="mb-4">
            <p className="text-white/70 text-xs mb-2">Split between:</p>
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
              Add Bill
            </button>
            <button
              onClick={() => setShowAddBill(false)}
              className="px-4 bg-white/20 text-white p-2 rounded-lg hover:bg-white/30 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Bills List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {bills.map(bill => (
          <div key={bill.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-white font-medium text-sm">{bill.title}</h4>
                <p className="text-white/60 text-xs">{bill.date}</p>
              </div>
              <button
                onClick={() => deleteBill(bill.id)}
                className="text-white/60 hover:text-[#ef4444] transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {bill.imageUrl && (
              <img src={bill.imageUrl} alt="Bill" className="w-full h-20 object-cover rounded-lg mb-2" />
            )}

            <div className="mb-2">
              <div className="flex justify-between text-white text-xs mb-1">
                <span>Total: ${bill.amount.toFixed(2)}</span>
                <span>Per person: ${bill.amountPerPerson.toFixed(2)}</span>
              </div>
              <p className="text-white/60 text-xs">Paid by: {bill.paidBy}</p>
            </div>

            {/* Payment Status */}
            <div className="space-y-1">
              <p className="text-white/80 text-xs font-medium">Who owes what:</p>
              {Object.entries(bill.payments).map(([person, amount]) => (
                <div key={person} className="flex items-center justify-between">
                  <span className="text-white text-xs">{person}</span>
                  {amount > 0 ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[#f59e0b] text-xs">Owes: ${amount.toFixed(2)}</span>
                      <input
                        type="number"
                        placeholder="Paid"
                        className="w-12 bg-white/10 text-white text-xs p-1 rounded border border-white/20 outline-none focus:border-[#8b5cf6]"
                        onBlur={(e) => updatePayment(bill.id, person, e.target.value)}
                      />
                    </div>
                  ) : (
                    <span className="text-[#10b981] text-xs">✓ Settled</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {bills.length === 0 && (
        <div className="text-center text-white/60 py-8">
          <div className="text-3xl mb-2">🍺</div>
          <p className="text-sm">No bills yet! Add your first one above.</p>
        </div>
      )}
    </div>
  );
};

export default TheKeoApp;