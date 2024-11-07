import dayjs from "dayjs";
import { IStore, IStoreReports } from "./page/orders/index.type";
import { IAdmin } from "./page/admin/index.type";


export const data: IStore[] = [
  {
    id: 1,
    title: "Example Title 1",
    boss: "Boss Name 1",
    manager: "Manager Name 1",
    responsible_person: "Responsible Person 1",
    password: "password123",
    username: "username1",
    additional_phone_number: "1234567890",
    phone_number: "0987654321",
    location: "Location 1",
    amount: 100,
    payed_date: dayjs(new Date()).format("DD-MM-YYYY"),
    block: false,
    is_active: true,
    created_at: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
    payment_list: [
      {
        id: 10,
        amount: 50000,
        payed: true,
        date: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
        residual: 0
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        date: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
        residual: 0
      },
      {
        id: 10,
        amount: 40000,
        payed: false,
        date: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
        residual: 10000
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        date: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
        residual: 0
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        date: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
        residual: 0
      },
    ]
  },
  {
    id: 2,
    title: "Example Title 2",
    boss: "Boss Name 2",
    manager: "Manager Name 2",
    responsible_person: "Responsible Person 2",
    password: "password456",
    username: "username2",
    additional_phone_number: "2345678901",
    phone_number: "9876543210",
    location: "Location 2",
    amount: 200,
    payed_date: dayjs(new Date()).format("DD-MM-YYYY"),
    block: false,
    is_active: true,
    created_at: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
    payment_list: [
      {
        id: 10,
        amount: 50000,
        payed: true,
        date: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
        residual: 0
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        date: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
        residual: 0
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        date: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
        residual: 0
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        date: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
        residual: 0
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        date: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
        residual: 0
      }
    ]
  },
  {
    id: 3,
    title: "Example Title 3",
    boss: "Boss Name 3",
    manager: "Manager Name 3",
    responsible_person: "Responsible Person 3",
    password: "password789",
    username: "username3",
    additional_phone_number: "3456789012",
    phone_number: "8765432109",
    location: "Location 3",
    amount: 300,
    payed_date: dayjs(new Date()).format("DD-MM-YYYY"),
    block: false,
    is_active: true,
    created_at: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
    payment_list: [
      {
        id: 10,
        amount: 50000,
        payed: true,
        date: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
        residual: 0
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        date: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
        residual: 0
      },
      {
        id: 10,
        amount: 30000,
        payed: false,
        date: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
        residual: 20000
      }
    ]
  }
]

export const reportsData: IStoreReports[] = [
  {
    id: 1,
    title: "Example Title 1",
    total_sales_price: 200000,
    sales_count: 10,
    boss: "Boss Name 1",
    manager: "Manager Name 1",
    responsible_person: "Responsible Person 1",
    password: "password123",
    username: "username1",
    additional_phone_number: "1234567890",
    phone_number: "0987654321",
    location: "Location 1",
    amount: 100,
    payed_date: dayjs(new Date()).format("DD-MM-YYYY"),
    block: false,
    is_active: true,
    created_at: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
    orders: [
      {
        id: 10,
        amount: 50000,
        payed: true,
        product: "Telefon",
        month: 6,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 0
      },
      {
        id: 10,
        amount: 5000000,
        payed: false,
        product: "Kompyuter",
        month: 10,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 500000
      },
      {
        id: 10,
        amount: 400000,
        payed: false,
        product: "Kompyuter",
        month: 10,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 200000
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        product: "Telefon",
        month: 6,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 0
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        product: "Telefon",
        month: 6,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 0
      },
    ]
  },
  {
    id: 2,
    title: "Example Title 2",
    total_sales_price: 300000,
    sales_count: 15,
    boss: "Boss Name 2",
    manager: "Manager Name 2",
    responsible_person: "Responsible Person 2",
    password: "password456",
    username: "username2",
    additional_phone_number: "2345678901",
    phone_number: "9876543210",
    location: "Location 2",
    amount: 200,
    payed_date: dayjs(new Date()).format("DD-MM-YYYY"),
    block: false,
    is_active: true,
    created_at: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
    orders: [
      {
        id: 10,
        amount: 50000,
        payed: false,
        product: "Telefon",
        month: 10,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 50000
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        product: "Telefon",
        month: 6,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 0
      },
      {
        id: 10,
        amount: 50000,
        payed: false,
        product: "Telefon",
        month: 10,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 50000
      },
      {
        id: 10,
        amount: 50000,
        payed: false,
        product: "Telefon",
        month: 10,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 50000
      },
      {
        id: 10,
        amount: 50000,
        payed: false,
        product: "Telefon",
        month: 10,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 50000
      }
    ]
  },
  {
    id: 3,
    title: "Example Title 3",
    total_sales_price: 400000,
    sales_count: 5,
    boss: "Boss Name 3",
    manager: "Manager Name 3",
    responsible_person: "Responsible Person 3",
    password: "password789",
    username: "username3",
    additional_phone_number: "3456789012",
    phone_number: "8765432109",
    location: "Location 3",
    amount: 300,
    payed_date: dayjs(new Date()).format("DD-MM-YYYY"),
    block: false,
    is_active: true,
    created_at: dayjs(new Date()).format("DD-MM-YYYY HH:mm"),
    orders: [
      {
        id: 10,
        amount: 50000,
        payed: false,
        product: "Quloqchin",
        month: 10,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 50000
      },
      {
        id: 10,
        amount: 50000,
        payed: true,
        product: "Telefon",
        month: 6,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 0
      },
      {
        id: 10,
        amount: 30000,
        payed: false,
        product: "Soat",
        month: 10,
        date: dayjs(new Date()).format("DD-MM"),
        residual: 50000
      }
    ]
  }
]

export const adminData: IAdmin[] = [
  {
    id: 1,
    first_name: "Jamol",
    last_name: "Fayziyev",
    admin_type: "SuperAdmin",
    username: "jamol12",
    password: "jamol12",
    phone_number: "+998901235263"
  }
]