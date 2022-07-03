import Dashboard from "views/Dashboard/Dashboard.js";
import Buttons from "views/Components/Buttons.js";
import GridSystem from "views/Components/GridSystem.js";
import Panels from "views/Components/Panels.js";
import SweetAlert from "views/Components/SweetAlertPage.js";
import Notifications from "views/Components/Notifications.js";
import Icons from "views/Components/Icons.js";
import Typography from "views/Components/Typography.js";
import RegularForms from "views/Forms/RegularForms.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";
import ValidationForms from "views/Forms/ValidationForms.js";
// import Wizard from "views/Forms/Wizard/Wizard.js";
import RegularTables from "views/Tables/archive/RegularTables.js";
import ExtendedTables from "views/Tables/archive/ExtendedTables.js";
import ReactTable from "views/Tables/archive/ReactTable.js";
import GoogleMaps from "views/Maps/GoogleMaps.js";
import FullScreenMap from "views/Maps/FullScreenMap.js";
import VectorMap from "views/Maps/VectorMap.js";
import Charts from "views/Charts/Charts.js";
import Calendar from "views/Calendar/Calendar.js";
import Widgets from "views/Widgets/Widgets.js";
import UserPage from "views/Pages/UserPage.js";
import TimelinePage from "views/Pages/TimelinePage.js";
import RTL from "views/Pages/RTL.js";
import PricingPage from "views/Pages/PricingPage.js";
import LoginPage from "views/Pages/dbs-page/LoginPage.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";

import BranchTable from "views/Tables/BranchTable.js";
import ServiceTypeTable from "views/Tables/ServiceTypeTable.js";
import ServiceTable from "views/Tables/ServiceTable.js";
import DiscountTable from "views/Tables/DiscountTable.js";
import AccountTable from "views/Tables/AccountTable.js";
import DoctorTable from "views/Tables/DoctorTable.js";
import BookingTable from "views/Tables/BookingTable.js";
import FeedbackTable from "views/Tables/FeedbackTable.js";
import Discount from "views/Pages/dbs-page/edit-form/Discount";
import StaffHome from "views/Pages/staff-page/StaffHome";
import StaffCancelAppointment from "views/Pages/staff-page/StaffCancelAppointment";
import BranchEdit from "views/Pages/dbs-page/edit-form/BranchEdit";
import DoctorEdit from "views/Pages/dbs-page/edit-form/DoctorEdit";
import ServiceTypeEdit from "views/Pages/dbs-page/edit-form/ServiceTypeEdit";
import AccountEdit from "views/Pages/dbs-page/edit-form/AccountEdit";
import FeedbackTableAdmin from "views/Tables/FeedbackTableAdmin";

let routes = [
  //Admin
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "now-ui-icons design_app",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/branchs",
    name: "Branch",
    icon: "now-ui-icons location_pin",
    component: BranchTable,
    layout: "/admin",
  },
  {
    path: "/service-type",
    name: "Service type",
    icon: "now-ui-icons files_box",
    component: ServiceTypeTable,
    layout: "/admin",
  },
  {
    path: "/services",
    name: "Service",
    icon: "now-ui-icons files_paper",
    component: ServiceTable,
    layout: "/admin",
  },
  {
    path: "/discounts",
    name: "Discount",
    icon: "now-ui-icons shopping_tag-content",
    component: DiscountTable,
    layout: "/admin",
  },
  {
    path: "/accounts",
    name: "Account",
    icon: "now-ui-icons users_single-02",
    component: AccountTable,
    layout: "/admin",
  },
  {
    path: "/doctors",
    name: "Doctor",
    icon: "now-ui-icons business_badge",
    component: DoctorTable,
    layout: "/admin",
  },
  {
    path: "/booking",
    name: "Booking",
    icon: "now-ui-icons education_paper",
    component: BookingTable,
    layout: "/admin",
  },
  {
    path: "/feedback",
    name: "Feedback",
    icon: "now-ui-icons education_glasses",
    component: FeedbackTable,
    layout: "/staff",
  },
  {
    path: "/feedback",
    name: "Feedback",
    icon: "now-ui-icons education_glasses",
    component: FeedbackTableAdmin,
    layout: "/admin",
  },
  {
    path: "/login-page",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    component: LoginPage,
    layout: "/auth",
    invisible: true,
  },
  {
    path: "/branch/edit/:id",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    component: BranchEdit,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/discount/edit",
    name: "Edit Discount",
    mini: "W",
    component: Discount,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/doctor/edit/:id",
    name: "Edit Doctor",
    mini: "W",
    component: DoctorEdit,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/account/edit/:id",
    name: "Edit Doctor",
    mini: "W",
    component: AccountEdit,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/service_type/edit/:id",
    name: "Edit Service Type",
    mini: "S",
    component: ServiceTypeEdit,
    layout: "/admin",
    invisible: true,
  },

  // Staff
  {
    path: "/home",
    name: "Home",
    icon: "now-ui-icons ui-1_calendar-60",
    component: StaffHome,
    layout: "/staff",
  },
  {
    path: "/appointment/cancel",
    name: "Cancel",
    icon: "now-ui-icons ui-1_simple-remove",
    component: StaffCancelAppointment,
    layout: "/staff",
  },

  // {
  //   collapse: true,
  //   path: "/pages",
  //   name: "Pages",
  //   state: "openPages",
  //   icon: "now-ui-icons design_image",
  //   views: [
  //     {
  //       path: "/timeline-page",
  //       name: "Timeline Page",
  //       mini: "TP",
  //       component: TimelinePage,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/user-page",
  //       name: "User Profile",
  //       mini: "UP",
  //       component: UserPage,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/rtl-support",
  //       name: "RTL Support",
  //       mini: "RS",
  //       component: RTL,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/register-page",
  //       name: "Register Page",
  //       short: "Register",
  //       mini: "RP",
  //       component: RegisterPage,
  //       layout: "/auth",
  //     },
  //     {
  //       path: "/login-page",
  //       name: "Login Page",
  //       short: "Login",
  //       mini: "LP",
  //       component: LoginPage,
  //       layout: "/auth",
  //     },
  //     {
  //       path: "/pricing-page",
  //       name: "Pricing Page",
  //       short: "Pricing",
  //       mini: "PP",
  //       component: PricingPage,
  //       layout: "/auth",
  //     },
  //     {
  //       path: "/lock-screen-page",
  //       name: "Lock Screen Page",
  //       short: "Lock",
  //       mini: "LSP",
  //       component: LockScreenPage,
  //       layout: "/auth",
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   path: "/components",
  //   name: "Components",
  //   state: "openComponents",
  //   icon: "now-ui-icons education_atom",
  //   views: [
  //     {
  //       path: "/buttons",
  //       name: "Buttons",
  //       mini: "B",
  //       component: Buttons,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/grid-system",
  //       name: "Grid System",
  //       mini: "GS",
  //       component: GridSystem,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/panels",
  //       name: "Panels",
  //       mini: "P",
  //       component: Panels,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/sweet-alert",
  //       name: "Sweet Alert",
  //       mini: "SA",
  //       component: SweetAlert,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/notifications",
  //       name: "Notifications",
  //       mini: "N",
  //       component: Notifications,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/icons",
  //       name: "Icons",
  //       mini: "I",
  //       component: Icons,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/typography",
  //       name: "Typography",
  //       mini: "T",
  //       component: Typography,
  //       layout: "/admin",
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   path: "/forms",
  //   name: "Forms 2",
  //   state: "openForms",
  //   icon: "now-ui-icons design_bullet-list-67",
  //   views: [
  //     {
  //       path: "/regular-forms",
  //       name: "Regular Forms",
  //       mini: "RF",
  //       component: RegularForms,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/extended-forms",
  //       name: "Extended Forms",
  //       mini: "EF",
  //       component: ExtendedForms,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/validation-forms",
  //       name: "Validation Forms",
  //       mini: "VF",
  //       component: ValidationForms,
  //       layout: "/admin",
  //     },
  // {
  //   path: "/wizard",
  //   name: "Wizard",
  //   mini: "W",
  //   component: Wizard,
  //   layout: "/admin",
  // },
  //   ],
  // },
  // {
  //   collapse: true,
  //   path: "/tables",
  //   name: "Tables",
  //   state: "openTables",
  //   icon: "now-ui-icons files_single-copy-04",
  //   views: [
  //     {
  //       path: "/regular-tables",
  //       name: "Regular Tables",
  //       mini: "RT",
  //       component: RegularTables,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/extended-tables",
  //       name: "Extended Tables",
  //       mini: "ET",
  //       component: ExtendedTables,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/react-table",
  //       name: "React Table",
  //       mini: "RT",
  //       component: ReactTable,
  //       layout: "/admin",
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   path: "/maps",
  //   name: "Maps",
  //   state: "openMaps",
  //   icon: "now-ui-icons location_pin",
  //   views: [
  //     {
  //       path: "/google-maps",
  //       name: "Google Maps",
  //       mini: "GM",
  //       component: GoogleMaps,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/full-screen-maps",
  //       name: "Full Screen Map",
  //       mini: "FSM",
  //       component: FullScreenMap,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/vector-maps",
  //       name: "Vector Map",
  //       mini: "VM",
  //       component: VectorMap,
  //       layout: "/admin",
  //     },
  //   ],
  // },

  // {
  //   path: "/charts",
  //   name: "Charts",
  //   icon: "now-ui-icons business_chart-pie-36",
  //   component: Charts,
  //   layout: "/admin",
  // },
  // {
  //   path: "/calendar",
  //   name: "Calendar",
  //   icon: "now-ui-icons media-1_album",
  //   component: Calendar,
  //   layout: "/admin",
  // },
];

export default routes;
