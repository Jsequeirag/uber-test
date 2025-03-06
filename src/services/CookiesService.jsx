import Cookies from 'js-cookie';

const getCookieByName = (name) => {
    const cookieValue = Cookies.get(name);
    if (cookieValue !== undefined) {
      console.log(`Cookie ${name}: ${cookieValue}`);
      return cookieValue;
    }
    console.log(`Cookie ${name} not found`);
    return null;
  };

export {getCookieByName};