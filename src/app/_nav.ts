import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/home/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Organization',
    url: '/home/organization',
    icon: 'fas fa-city',
    children: [
      {
        name: 'Company Profile',
        url: '/home/organization/companyprofile',
        icon: 'fas fa-clipboard-check' 
      },
      {
        name: 'Control Panel',
        url: '/home/organization/controlpanel',
        icon: 'fab fa-cpanel'
      },
      {
        name: 'Master',
        url: '/home/organization/master',
        icon: 'fas fa-clipboard-list'
      },
      {
        name: 'User Management',
        url: '/home/organization/usermanagement',
        icon: 'fas fa-diagnoses'
      },
      {
        name: 'Audit Log',
        url: '/home/organization/auditlog',
        icon: 'fas fa-file-alt'
      },
      {
        name: 'Calender',
        url: '/home/organization/calender',
        icon: 'fab fa-elementor'
      },
      {
        name: 'ESS SETTINGS',
        url: '',
        icon: 'fas fa-calendar'
      },
      {
        name: 'Query Support Desk',
        url: '',
        icon: 'fas fa-hands-helping'
      },
      {
        name: 'Labour Law Guide',
        url: '',
        icon: 'fas fa-industry'
      }
    ]
  },
  {
    name: 'Recruitment',
    url: '/home/onboarding',
    icon: 'fas fa-address-card',
    children: [
      {
        name: 'R Dashboard',
        url: '',
        icon: 'fas fa-users'
      },
      {
        name: 'Requisition',
        url: '',
        icon: 'fas fa-users'
      },
      {
        name: 'Invite & Recruit',
        url: '',
        icon: 'fas fa-users'
      }
    ]
  },
  {
    name: 'Onboarding',
    url: '/home/onboarding',
    icon: 'fas fa-book-reader',
    children: [
      {
        name: 'O Dashboard',
        url: '',
        icon: 'fas fa-users'
      },
      {
        name: 'Personal Info',
        url: '/home/onboarding/personalinfo',
        icon: 'fas fa-users'
      },
      {
        name: 'Assign Emp',
        url: '',
        icon: 'fas fa-users'
      }
    ]
  },
  {
    name: 'Payroll',
    url: '/home/payroll',
    icon: 'fas fa-compress-arrows-alt',
    children: [
      {
        name: 'Pay Dashboard',
        url: '/home/payroll/salary-structure',
        icon: 'fas fa-rupee-sign'
      },
      {
        name: 'Salary Structure',
        url: '/home/payroll/salary-structure',
        icon: 'fas fa-money'
      },
      {
        name: 'Adhoc',
        url: '/home/payroll/adhoc',
        icon: 'fas fa-money'
      },
      {
        name: 'Payroll Settings',
        url: '',
        icon: 'fas fa-money'
      },
      {
        name: 'Process Engine',
        url: '',
        icon: 'fas fa-money'
      },
      {
        name: 'AUTO Run',
        url: '',
        icon: 'fas fa-money'
      },
      {
        name: 'Payslips',
        url: '',
        icon: 'fas fa-money'
      },
      {
        name: 'ITCS',
        url: '',
        icon: 'fas fa-money'
      },
      {
        name: 'YTD Statement',
        url: '',
        icon: 'fas fa-money'
      },
      {
        name: 'PF Cont Statement',
        url: '',
        icon: 'fas fa-money'
      },
      {
        name: 'Form 16s',
        url: '',
        icon: 'fas fa-money'
      }
    ]
  },
  {
    name: 'COMP & BEN',
    url: '/home/onboarding',
    icon: 'fas fa-edit',
    children: [
      {
        name: 'CTC',
        url: '',
        icon: 'fas fa-users'
      },
      {
        name: 'IT Declaration',
        url: '',
        icon: 'fas fa-users'
      },
      {
        name: 'IT Proofs',
        url: '',
        icon: 'fas fa-users'
      },
      {
        name: 'Flexi Planning',
        url: '',
        icon: 'fas fa-users'
      },
      {
        name: 'Flexi Reimbursement',
        url: '',
        icon: 'fas fa-users'
      }
    ]
  }, 
  {
    name: 'Customize',
    url: '/home/customize',
    icon: 'fas fa-cog',
    children: [
      {
        name: 'Provident Fund',
        url: '/home/customize/providentfund',
        icon: 'fas fa-table'
      },
      {
        name: 'Professional Tax',
        url: '/home/customize/professionaltax',
        icon: 'fas fa-table'
      },
      {
        name: 'LWF',
        url: '/home/customize/lwf',
        icon: 'fas fa-table'
      },
      {
        name: 'ESI',
        url: '/home/customize/esi',
        icon: 'fas fa-table'
      }
    ]
  },
  {
    name: 'Settings',
    url: '/home/settings',
    icon: 'fas fa-cogs',
    children: [
      {
        name: 'Country',
        url: '/home/settings/country',
        icon: 'fas fa-globe'
      },
      {
        name: 'State',
        url: '/home/settings/state',
        icon: 'fas fa-globe'
      },
      {
        name: 'City',
        url: '/home/settings/city',
        icon: 'fas fa-globe'
      },
      {
        name: 'Roles',
        url: '/home/settings/role',
        icon: 'fas fa-user'
      },
      {
        name: 'Company Events',
        url: '/home/settings/companyevent',
        icon: 'fas fa-table'
      },
      {
        name: 'System Settings',
        url: '/home/settings/systemsettings',
        icon: 'fas fa-table'
      }
    ]
  },
  {
    name: 'SEPARATION',
    url: '',
    icon: 'fas fa-dice-d20'
  },
  {
    name: 'TIME & ATTENDANCE',
    url: '',
    icon: 'fas fa-chalkboard-teacher'
  },
  {
    name: 'LEAVE MANAGEMENT',
    url: '',
    icon: 'icon-speedometer'
  },
  {
    name: 'REPORTS',
    url: '',
    icon: 'fab fa-dropbox'
  }, {
    name: 'ANALYTICS',
    url: '',
    icon: 'far fa-chart-bar'
  },
  {
    divider: true
  },

];


