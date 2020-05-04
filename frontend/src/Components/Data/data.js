import {faMedal, faUserCheck, faCheckCircle, } from '@fortawesome/free-solid-svg-icons';
export const mainBar = [
    {
        navLinkName : "Services",
        path : '/services'
    },
    {
        navLinkName : "Become A Professional",
        path : '/careers'
    },
    {
        navLinkName : "Contact Us",
        path : '/contact-us'
    },
    {
        navLinkName : "Login",
        path : '/login'
    },
    {
        navLinkName : "Create Account",
        path : '/signup'
    }
];
//value to be retrieve from server (optional)
export const locations = [
    {
        name : "Lucknow"
    },
    
    {
        name : "Delhi"
    },
    {
        name : "Mumbai"
    },
]
//value to be retrieve from server
export const services = [
    {
        city : 'Lucknow',
        services : [ "Salon", "Carpenter", "Technician"]
    },
    {
        city : 'Delhi',
        services : [ "Salon", "Carpenter", "Technician"]
    },
    {
        city : 'Mumbai',
        services : [ "Salon", "Carpenter", "Technician"]
    }
];
//static data if server gets down
export const categories = [
    { name : 'Salon'},
    { name : 'Carpenters'},
    { name : 'Plumbers'},
    { name : 'Electricians'},
    { name : 'Cleaners'}
]
//static data
export const qualities = [{
    title : `High Quality & Trusted Professionals`,
    body:`We provide Towny trained professionals, 
          verified, background checked and high 
          quality professionals`,
    icon : faMedal},
    {
    title : `Match to Your Needs`,
    body:`We match you with the right professionals
          with budget friendly`,
    icon : faUserCheck},
    {
    title : `Hassel Free Service`,
    body:`Super convenient, guaranteed service from
          booking to delivery`,
    icon : faCheckCircle}]
//static data    
export const profileOptions = ["User Profile", "Account Settings", "Check Your Tickets" , "Service Categories", "Check Your History", "Sign Out"];    
