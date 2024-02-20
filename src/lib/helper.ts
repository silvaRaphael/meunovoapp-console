export const upperFirst = (str: string): string => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

export async function convertToBase64(file: File, onDone: (result: string | ArrayBuffer | null) => void) {
  const reader = new FileReader()

  reader.onloadend = () => {
    onDone(reader.result)
  }

  reader.readAsDataURL(file)
}
