import { writable } from 'svelte/store';

export const isBookingOpen = writable(false);
export const selectedBookingService = writable(null);
export const selectedBookingBarber = writable(null);

export const bookingState = writable({
  step: 1,
  services: [],
  barber: null,
  date: new Date().toISOString().split('T')[0],
  timeSlot: '10:30 AM',
  clientName: '',
  clientPhone: '',
  clientEmail: '',
  sendSMS: true,
  paymentMethod: 'shop', // 'shop' or 'deposit'
  confirmed: false,
  appointmentId: null
});

export function openBookingWithService(service, barber = null) {
  selectedBookingService.set(service);
  selectedBookingBarber.set(barber);
  
  bookingState.update(state => ({
    ...state,
    step: 1,
    services: service ? [service] : [],
    barber: barber || null,
    confirmed: false,
    appointmentId: null
  }));
  
  isBookingOpen.set(true);
}
