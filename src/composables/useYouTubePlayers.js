export function useYouTubePlayers() {
  let players = []

  function initPlayers() {
    const placeholders = document.querySelectorAll('.yt-placeholder')
    placeholders.forEach(el => {
      const videoId = el.getAttribute('data-video-id')
      const player = new window.YT.Player(el, {
        height: '100%',
        width: '100%',
        videoId,
        playerVars: { rel: 0, modestbranding: 1 },
        events: {
          onStateChange(event) {
            if (event.data === window.YT.PlayerState.PLAYING) {
              players.forEach(p => {
                if (p !== player && p.getPlayerState() === window.YT.PlayerState.PLAYING) {
                  p.pauseVideo()
                }
              })
            }
          }
        }
      })
      players.push(player)
    })
  }

  function clearPlayers() {
    players.forEach(p => {
      try { p.destroy() } catch (_) {}
    })
    players = []
  }

  function init() {
    if (window.YT && window.YT.Player) {
      initPlayers()
    } else {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev()
        initPlayers()
      }
    }
  }

  return { init, clearPlayers }
}
