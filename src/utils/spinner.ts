import { colorful } from '.'

export function showSpinner(str?: string) {
  const chars = ['◜', '◠', '◝', '◞', '◡', '◟']
  let timeout: NodeJS.Timeout | null = null
  let charIndex = 0
  function loading() {
    timeout = setTimeout(() => {
      process.stdout.write(
        '\r' +
          colorful(chars[charIndex % chars.length], 'FgBlue') +
          ' ' +
          (str ?? '')
      )
      charIndex++
      loading()
    }, 100)
  }
  loading()
  return () => {
    if (timeout) {
      clearTimeout(timeout)
    }
  }
}
