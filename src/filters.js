export function formatDate (dateString) {
  let date = new Date(dateString)

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
