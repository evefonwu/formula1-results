-- seasons list from 2001 to 2019
select year 
from formula1.seasons
where year > 2000 and year < 2020
order by year desc;