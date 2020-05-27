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
    icon: 'fa fa-th',
    children: [
      {
        name: 'Company Profile',
        url: '/home/organization/companyprofile',
        icon: 'fa fa-users'
      },
      {
        name: 'Control Panel',
        url: '/home/organization/controlpanel',
        icon: 'fa fa-wrench'
      },
      {
        name: 'Master',
        url: '/home/organization/master',
        icon: 'fa fa-cogs'
      },
      {
        name: 'User Management',
        url: '/home/organization/usermanagement',
        icon: 'fa fa-user-o'
      },
      {
        name: 'Audit Log',
        url: '/home/organization/auditlog',
        icon: 'fa fa-file-text-o'
      },
      {
        name: 'Calender',
        url: '/home/organization/calender',
        icon: 'fa fa-calendar'
      },
      {
        name: 'ESS SETTINGS',
        url: '',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Query Support Desk',
        url: '',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Labour Law Guide',
        url: '',
        icon: 'fa fa-calendar'
      }
    ]
  },
  {
    name: 'Recruitment',
    url: '/home/onboarding',
    icon: 'fa fa-th',
    children: [
      {
        name: 'R Dashboard',
        url: '',
        icon: 'fa fa-users'
      },
      {
        name: 'Requisition',
        url: '',
        icon: 'fa fa-users'
      },
      {
        name: 'Invite & Recruit',
        url: '',
        icon: 'fa fa-users'
      }
    ]
  },
  {
    name: 'Onboarding',
    url: '/home/onboarding',
    icon: 'fa fa-th',
    children: [
      {
        name: 'O Dashboard',
        url: '',
        icon: 'fa fa-users'
      },
      {
        name: 'Personal Info',
        url: '/home/onboarding/personalinfo',
        icon: 'fa fa-users'
      },
      {
        name: 'Assign Emp',
        url: '',
        icon: 'fa fa-users'
      }
    ]
  },
  {
    name: 'Payroll',
    url: '/home/payroll',
    icon: 'fa fa-money',
    children: [
      {
        name: 'Pay Dashboard',
        url: '/home/payroll/salary-structure',
        icon: 'fa fa-money'
      },
      {
        name: 'Salary Structure',
        url: '/home/payroll/salary-structure',
        icon: 'fa fa-money'
      },
      {
        name: 'Adhoc',
        url: '/home/payroll/adhoc',
        icon: 'fa fa-money'
      },
      {
        name: 'Payroll Settings',
        url: '',
        icon: 'fa fa-money'
      },
      {
        name: 'Process Engine',
        url: '',
        icon: 'fa fa-money'
      },
      {
        name: 'AUTO Run',
        url: '',
        icon: 'fa fa-money'
      },
      {
        name: 'Payslips',
        url: '',
        icon: 'fa fa-money'
      },
      {
        name: 'ITCS',
        url: '',
        icon: 'fa fa-money'
      },
      {
        name: 'YTD Statement',
        url: '',
        icon: 'fa fa-money'
      },
      {
        name: 'PF Cont Statement',
        url: '',
        icon: 'fa fa-money'
      },
      {
        name: 'Form 16s',
        url: '',
        icon: 'fa fa-money'
      }
    ]
  },
  {
    name: 'COMP & BEN',
    url: '/home/onboarding',
    icon: 'fa fa-th',
    children: [
      {
        name: 'CTC',
        url: '',
        icon: 'fa fa-users'
      },
      {
        name: 'IT Declaration',
        url: '',
        icon: 'fa fa-users'
      },
      {
        name: 'IT Proofs',
        url: '',
        icon: 'fa fa-users'
      },
      {
        name: 'Flexi Planning',
        url: '',
        icon: 'fa fa-users'
      },
      {
        name: 'Flexi Reimbursement',
        url: '',
        icon: 'fa fa-users'
      }
    ]
  }, 
  {
    name: 'Customize',
    url: '/home/customize',
    icon: 'fa fa-cog',
    children: [
      {
        name: 'Provident Fund',
        url: '/home/customize/providentfund',
        icon: 'fa fa-table'
      },
      {
        name: 'Professional Tax',
        url: '/home/customize/professionaltax',
        icon: 'fa fa-table'
      },
      {
        name: 'LWF',
        url: '/home/customize/lwf',
        icon: 'fa fa-table'
      },
      {
        name: 'ESI',
        url: '/home/customize/esi',
        icon: 'fa fa-table'
      }
    ]
  },
  {
    name: 'Settings',
    url: '/home/settings',
    icon: 'fa fa-cogs',
    children: [
      {
        name: 'Country',
        url: '/home/settings/country',
        icon: 'fa fa-globe'
      },
      {
        name: 'State',
        url: '/home/settings/state',
        icon: 'fa fa-globe'
      },
      {
        name: 'City',
        url: '/home/settings/city',
        icon: 'fa fa-globe'
      },
      {
        name: 'Roles',
        url: '/home/settings/role',
        icon: 'fa fa-user'
      },
      {
        name: 'Company Events',
        url: '/home/settings/companyevent',
        icon: 'fa fa-table'
      },
      {
        name: 'System Settings',
        url: '/home/settings/systemsettings',
        icon: 'fa fa-table'
      }
    ]
  },
  {
    name: 'SEPARATION',
    url: '',
    icon: 'icon-speedometer'
  },
  {
    name: 'TIME & ATTENDANCE',
    url: '',
    icon: 'icon-speedometer'
  },
  {
    name: 'LEAVE MANAGEMENT',
    url: '',
    icon: 'icon-speedometer'
  },
  {
    name: 'REPORTS',
    url: '',
    icon: 'icon-speedometer'
  }, {
    name: 'ANALYTICS',
    url: '',
    icon: 'icon-speedometer'
  },
  {
    divider: true
  },

];


