<script>
  import svelteIcon from '../assets/svelte.svg'
</script>

<div class="welcome">
  <img src={svelteIcon} alt="Svelte" />
  <h1>Svelte Micro-Frontend</h1>
  <p>
    This is a Svelte micro-frontend application that can be integrated into the Next.js shell.
  </p>
</div>

<style>
  .welcome {
    padding: 2rem;
  }

  img {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  
  img:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
    margin: 1rem 0;
  }

  p {
    font-size: 1.2em;
    color: #666;
    margin: 1rem 0;
  }

  @media (prefers-color-scheme: light) {
    p {
      color: #888;
    }
  }
</style>