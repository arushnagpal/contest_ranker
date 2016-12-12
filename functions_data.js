module.exports =
{
    121: function(arr,D,fn) {
     		var ans=0;
     		for(i=0;i<D;i++)
     		{
     			ans+=Math.abs(arr[i]*Math.sin(arr[i])+0.1*arr[i]);
     		}
     		fn(ans);
     	},
     123: function(arr,D,fn) {
            var ans=0;
            for(i=0;i<D-1;i++)
            {
                ans+=Math.pow((arr[i]*arr[i]),(arr[i+1]*arr[i+1])+1)+Math.pow(arr[i+1]*arr[i+1],arr[i]*arr[i]+1);
            }
            fn(ans);
        },
    124: function(arr,D,fn) {
            var ans1=0,ans2=1,ans;
            for(i=0;i<D;i++)
            {
                ans1+=arr[i]*arr[i]/4000;
            }
            for(i=0;i<D;i++)
            {
                ans2*=Math.cos(arr[i]/Math.sqrt(i+1));
            }
            ans=ans1-ans2+1;
            fn(ans);
        },
    125: function(arr,D,fn) {
            var ans=0;
            for(i=0;i<D;i++)
            {
                ans+=arr[i];
            }
            pqr=Math.abs(ans);
            abc=pqr*10000;
            def=Math.pow(abc,0.5);
            fn(def);
        },
    126: function(arr,D,fn) {
            var ans=0;
            arr[D]=arr[0];
            for(i=1;i<=D/4;i++)
            {
                ans+=Math.pow((arr[4*(i)-3]+10*arr[4*(i)-2]),2)+5*Math.pow((arr[4*(i)-1]-arr[4*(i)]),2)+Math.pow((arr[4*(i)-2]-arr[4*(i)-1]),4)+10*Math.pow((arr[4*(i)-3]-arr[4*(i)]),4);
            }
            fn(ans);
        },
    
    caller: function(str1) { this[str1](); }
}