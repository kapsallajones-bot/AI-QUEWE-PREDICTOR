export type QueueStatus = "Waiting" | "Called" | "Serving" | "Completed";

export type QueueEntry = {
  id: string;
  number: string;
  customer: string;
  arrival: string;
  predictedWait: number;
  position: number;
  cashier: string;
  service: string;
  status: QueueStatus;
};

export const serviceTypes = [
  "Deposit",
  "Withdrawal",
  "Account Opening",
  "Customer Service",
  "Loan",
  "Foreign Exchange",
];

export const queueEntries: QueueEntry[] = [
  { id: "1", number: "B105", customer: "Amina Njoya", arrival: "09:12", predictedWait: 0, position: 0, cashier: "Counter 3", service: "Withdrawal", status: "Serving" },
  { id: "2", number: "B106", customer: "Paul Etoundi", arrival: "09:15", predictedWait: 2, position: 1, cashier: "Counter 1", service: "Deposit", status: "Called" },
  { id: "3", number: "B107", customer: "Grace Mballa", arrival: "09:18", predictedWait: 6, position: 2, cashier: "—", service: "Account Opening", status: "Waiting" },
  { id: "4", number: "B108", customer: "Yusuf Bakari", arrival: "09:21", predictedWait: 9, position: 3, cashier: "—", service: "Loan", status: "Waiting" },
  { id: "5", number: "B109", customer: "Marie Fotso", arrival: "09:24", predictedWait: 13, position: 4, cashier: "—", service: "Customer Service", status: "Waiting" },
  { id: "6", number: "B110", customer: "Daniel Ngu", arrival: "09:27", predictedWait: 17, position: 5, cashier: "—", service: "Deposit", status: "Waiting" },
  { id: "7", number: "B111", customer: "Clarisse Abena", arrival: "09:31", predictedWait: 21, position: 6, cashier: "—", service: "Withdrawal", status: "Waiting" },
  { id: "8", number: "B104", customer: "Ibrahim Sadou", arrival: "08:58", predictedWait: 0, position: 0, cashier: "Counter 2", service: "Deposit", status: "Completed" },
  { id: "9", number: "B103", customer: "Estelle Kouam", arrival: "08:51", predictedWait: 0, position: 0, cashier: "Counter 4", service: "Loan", status: "Completed" },
];

export type Cashier = {
  id: string;
  name: string;
  counter: number;
  status: "Available" | "Busy" | "Offline";
  served: number;
  avgService: number;
  rating: number;
};

export const cashiers: Cashier[] = [
  { id: "CSH-001", name: "Aline Tchoumi", counter: 1, status: "Available", served: 34, avgService: 4.2, rating: 4.8 },
  { id: "CSH-002", name: "Bertrand Eyong", counter: 2, status: "Busy", served: 41, avgService: 5.1, rating: 4.5 },
  { id: "CSH-003", name: "Chantal Ndifor", counter: 3, status: "Busy", served: 28, avgService: 3.8, rating: 4.9 },
  { id: "CSH-004", name: "David Owona", counter: 4, status: "Available", served: 22, avgService: 6.4, rating: 4.1 },
  { id: "CSH-005", name: "Elise Mbarga", counter: 5, status: "Offline", served: 0, avgService: 0, rating: 4.3 },
];

export const hourlyArrivals = [
  { hour: "08:00", customers: 24, service: 4.1 },
  { hour: "09:00", customers: 48, service: 4.8 },
  { hour: "10:00", customers: 62, service: 5.6 },
  { hour: "11:00", customers: 71, service: 6.2 },
  { hour: "12:00", customers: 53, service: 5.9 },
  { hour: "13:00", customers: 38, service: 4.6 },
  { hour: "14:00", customers: 57, service: 5.2 },
  { hour: "15:00", customers: 66, service: 5.8 },
  { hour: "16:00", customers: 44, service: 4.9 },
];

export const forecast = [
  { hour: "16:00", actual: 44, predicted: 46 },
  { hour: "17:00", actual: null, predicted: 58 },
  { hour: "18:00", actual: null, predicted: 63 },
  { hour: "19:00", actual: null, predicted: 41 },
  { hour: "20:00", actual: null, predicted: 22 },
];

export const statusTone: Record<QueueStatus | Cashier["status"], string> = {
  Waiting: "bg-warning/15 text-warning-foreground border-warning/30",
  Called: "bg-info/15 text-info border-info/30",
  Serving: "bg-primary/12 text-primary border-primary/30",
  Completed: "bg-muted text-muted-foreground border-border",
  Available: "bg-success/15 text-success border-success/30",
  Busy: "bg-destructive/12 text-destructive border-destructive/30",
  Offline: "bg-muted text-muted-foreground border-border",
};
