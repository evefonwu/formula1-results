-- all-time top 25 constructors standing by points
select constructors.name as constructor,
     cast(sum(points) as int) as points
from formula1.results
     join formula1.constructors using(constructorid)
group by constructors.name
order by points desc
limit 25;