const timerHover = (elem: HTMLDivElement) => {
  const timer = setTimeout(() => {
    elem.style.scale = '1'

    clearTimeout(timer)
  }, 150)
}

export default timerHover
