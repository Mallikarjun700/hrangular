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
      }
    ]
  },
  {
    name: 'Onboarding',
    url: '/home/onboarding',
    icon: 'fa fa-th',
    children: [
      {
        name: 'Personal Info',
        url: '/home/onboarding/personalinfo',
        icon: 'fa fa-users'
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
      }
    ]
  },
  {
    divider: true
  },

];


