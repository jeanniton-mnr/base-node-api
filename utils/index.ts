



module.exports = {

	randomRange:  function(min = 0, max){
		return (~~(Math.random() * max) + min);
	},

	minNumber: function(min =0, max){
		return Math.min(min, max);
	},

	hasTime: function(date){
		date = new Date(date);
		if(isNaN(date)){
			return false;
		}
		// If date instance has no time value, this should be forcibly 0. (contrary is not true)
		let isZero = date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();
		return isZero;
	},

}
