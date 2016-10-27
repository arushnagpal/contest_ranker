module.exports =
{
    112: function(arr,D,fn) {
     		var ans=1;
     		for(i=0;i<D;i++)
     		{
     			ans+=Math.abs(arr[i]*Math.sin(arr[i])+0.1*arr[i]);
     		}
     		fn(ans);
     	},
    caller: function(str1) { this[str1](); }
}