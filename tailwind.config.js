/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,php}"],
  theme: {
    extend: {
      colors: {
        'button-blue': '#1E40AF', // Custom blue color for buttons
        'button-red': '#DC2626', // Custom red color for buttons
        'button-green': '#10B981', // Custom green color for buttons
        'button-white': '#FFFFFF', // Custom white color for buttons
        'button-transparent' : 'rgba(255, 255, 255, 0.0)', // Custom transparent color for buttons
        //TEXT COLORS
        'button-text': '#FFFFFF', // Custom text color for buttons
        'button-text-golden': '#FFE8B6', // Custom text color for buttons
        'button-text-black': '#000000', // Custom text color
        'text-title' : '#EED6BA', //Black color for the title
        'button-text-hover-golden': '#B89958', // Custom text color for buttons
        //BUTTON HOVER
        'button-blue-hover': '#212e40', // Custom blue color for buttons
        //COLOR FOR NAV BAR
        'nav-bar' : '#000000', //White color for the nav bar
        //COLOR FOR PAGE BACKGROUND
        'page-background' : '#08080d', //black color for the page background
        //COLOR FOR FORM BACKGROUND
        'form-background' : 'rgba(10, 94, 166, 0.26)', //White color for the form background
      },
      borderRadius: {
        'button': '0.375rem', // Custom border radius for buttons
        //FORM BORDER RADIUS
        'form': '0.5rem', // Custom border radius for forms
      },
      padding: {
        'button-y': '1rem', // Custom vertical padding for buttons
        'button-x': '1rem', // Custom horizontal padding for buttons
        //padding for the login and register forms
        'form-y': '1rem', // Custom vertical padding for forms
        'form-x': '1rem', // Custom horizontal padding for
      },
      fontSize: {
        'title': '3rem', // Custom font size for title
      },
      opacity: {
        '90': '0.9', 
        '80': '0.8',
        '70': '0.7',
        '60': '0.6',
        '50': '0.5',
        '40': '0.4',
        '30': '0.3',
        '20': '0.2',
      },
      transitionDuration: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
      },
    },
  },
  plugins: [],
}

