<script>
  let count = 0
  const increment = () => {
    count += 1
  }
</script>

<div class="card">
  <button on:click={increment}>
    count is {count}
  </button>
  <p>
    Edit <code>src/lib/Counter.svelte</code> to test HMR
  </p>
</div>

<style>
  .card {
    padding: 2em;
  }

  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    color: white;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  
  button:hover {
    border-color: #646cff;
  }
  
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  code {
    background-color: #f1f1f1;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
  }

  @media (prefers-color-scheme: light) {
    button {
      background-color: #f9f9f9;
      color: #213547;
    }
    
    code {
      background-color: #f1f1f1;
      color: #213547;
    }
  }
</style>