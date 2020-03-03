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
        icon: 'fa fa-table'
      },
      {
        name: 'Control Panel',
        url: '/home/organization/controlpanel',
        icon: 'fa fa-table'
      },
      {
        name: 'Master',
        url: '/home/organization/master',
        icon: 'fa fa-table'
      },
      {
        name: 'User Management',
        url: '/home/organization/usermanagement',
        icon: 'fa fa-table'
      },
      {
        name: 'Audit Log',
        url: '/home/organization/auditlog',
        icon: 'fa fa-table'
      },
      {
        name: 'Calender',
        url: '/home/organization/calender',
        icon: 'fa fa-table'
      }
    ]
  },
  {
    name: 'Settings',
    url: '/home/settings',
    icon: 'fa fa-cog',
    children: [
      {
        name: 'Country',
        url: '/home/settings/country',
        icon: 'fa fa-table'
      },
      {
        name: 'State',
        url: '/home/settings/state',
        icon: 'fa fa-table'
      },
      {
        name: 'City',
        url: '/home/settings/city',
        icon: 'fa fa-table'
      },
      {
        name: 'Roles',
        url: '/home/settings/role',
        icon: 'fa fa-table'
      },
      {
        name: 'Company Events',
        url: '/home/settings/companyevent',
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
      }
    ]
  },
  {
    divider: true
  },

];


