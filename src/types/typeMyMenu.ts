import { Food } from './typeFood';

export type DayMenu = {
  breakfastId: string;
  lunchId: string;
  dinnerId: string;
};

export type MyMenu = {
  day: {
    sunday: DayMenu;
    monday: DayMenu;
    tuesday: DayMenu;
    wednesday: DayMenu;
    thursday: DayMenu;
    friday: DayMenu;
    saturday: DayMenu;
  };
  creatorId: string;
  myMenuId: string;
};

export type DayMenuWithFood = {
  breakfast: Food;
  lunch: Food;
  dinner: Food;
  dayOfWeek: string;
};

export type MyMenuWithFood = {
  sundayFood: DayMenuWithFood;
  mondayFood: DayMenuWithFood;
  tuesdayFood: DayMenuWithFood;
  wednesdayFood: DayMenuWithFood;
  thursdayFood: DayMenuWithFood;
  fridayFood: DayMenuWithFood;
  saturdayFood: DayMenuWithFood;
};
