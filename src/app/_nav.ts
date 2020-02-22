import { INavData } from '@coreui/angular';
/*
{
    name: 'Onboarding',
    url: '/home/onboarding',
    icon: 'fa fa-th',
    children: [
      {
        name: 'Personal Info',
        url: '/home/onboarding/personalinfo',
        icon: 'fa fa-table'
      }
    ]
  },	

*/
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
      }
    ]
  },
  
  {
    divider: true
  },

];


