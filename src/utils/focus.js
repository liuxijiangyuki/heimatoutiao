const directiveObj = {
  install (Vue) {
    Vue.directive('fofo', {
      inserted (el) {
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          setTimeout(() => {
            const theInput = el.querySelector('input')
            const theTextArea = el.querySelector('textarea')
            if (theInput) theInput.focus()
            if (theTextArea) theTextArea.focus()
          }, 500)
        }
      },
      update (el) {
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          setTimeout(() => {
            const theInput = el.querySelector('input')
            const theTextArea = el.querySelector('textarea')
            if (theInput) theInput.focus()
            if (theTextArea) theTextArea.focus()
          }, 500)
        }
      }
    })
  }
}
export default directiveObj
