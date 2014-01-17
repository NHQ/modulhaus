module.exports = rules

function rules(prev, next){
  for(i=0;i<prev.shape[0];i++)
    {
      for(j=0;j<prev.shape[1];j++)
      {
      var count = 0;
     for(ci=-1;ci<=1;ci++)
      {
        for(cj=-1;cj<=1;cj++)
        {
        
        if(prev.get(i+ci,j+cj)>9)
        count=count+1;
        }
       }
             
        if(prev.get(i,j)>9)
        count=count-1;

       if(count === 2 && prev.get(i,j)>9)
          next.set(i,j,12);
       else if(count === 3)
          next.set(i,j, 13);
       else
          next.set(i,j, count);

       }
  }
}


