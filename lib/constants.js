export const CAR_CATEGORIES = Object.freeze([
  { value: 'suv', label: 'SUV' },
  { value: 'economy', label: 'Economy' },
  { value: 'van', label: 'Van' },
  { value: 'mercedes', label: 'Mercedes' },
  { value: 'lamborghini', label: 'Lamborghini' },
  { value: 'ferrari', label: 'Ferrari' },
]);

export const BOOKING_STATUS = Object.freeze({ REQUESTED: 'requested', CONFIRMED: 'confirmed', REJECTED: 'rejected', PICKED_UP: 'picked_up', OVERDUE: 'overdue', RETURNED: 'returned', CANCELLED: 'cancelled' });

export const BOOKING_STATUS_LABELS = Object.freeze({ requested: 'Requested', confirmed: 'Confirmed', rejected: 'Rejected', picked_up: 'On trip', overdue: 'Overdue', returned: 'Returned', cancelled: 'Cancelled' });
export const CUSTOMER_BOOKING_STATUS_LABELS = Object.freeze({ requested: 'Pending approval', confirmed: 'Confirmed', rejected: 'Not approved', picked_up: 'Currently renting', overdue: 'Overdue', returned: 'Completed', cancelled: 'Cancelled' });
export const BOOKING_STATUS_TONE = Object.freeze({ requested: 'default', confirmed: 'info', rejected: 'danger', picked_up: 'brand', overdue: 'danger', returned: 'info', cancelled: 'default' });
export const BOOKING_FLOW = Object.freeze(['requested', 'confirmed', 'picked_up', 'overdue', 'returned']);
export const CITIES = Object.freeze([{ value: 'lagos', label: 'Lagos' }]);
export const LAGOS_AREAS = Object.freeze(['Agege','Ajah','Alimosho','Apapa','Badagry','Epe','Festac','Gbagada','Ikeja','Ikorodu','Ikotun','Ikoyi','Ilupeju','Isolo','Ketu','Lekki','Magodo','Maryland','Mushin','Ogba','Ojo','Ojodu','Oshodi','Sangotedo','Surulere','Victoria Island','Yaba']);
export const ROLES = Object.freeze({ RENTER: 'user', ADMIN: 'admin' });
