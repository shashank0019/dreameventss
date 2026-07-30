export const cleanWhatsAppNumber = (numStr) => {
  if (!numStr) return ''
  // Strip all non-digit characters except leading plus if any, or just return digits
  return numStr.replace(/\D/g, '')
}

export const getWhatsAppLink = (phoneNumber, message) => {
  const cleanNumber = cleanWhatsAppNumber(phoneNumber)
  const encodedText = encodeURIComponent(message)
  return `https://wa.me/${cleanNumber}?text=${encodedText}`
}

export const getBookingInquiryMessage = (packageName, clientName, eventDate) => {
  return `Hello Dream Events! I am interested in inquiring about the "${packageName}" package for my upcoming event. My name is ${clientName} and the event date is planned for ${eventDate}. I would love to connect and get more details!`
}

export const getGeneralInquiryMessage = () => {
  return `Hello Dream Events! I would like to make a general inquiry about your event decoration and styling packages. Please let me know how we can proceed!`
}
