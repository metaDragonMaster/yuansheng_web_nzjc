const getters = {
	userName:state => state.user.userName,
	isSign:state => state.user.isSign,
    userInfo:state => state.user.userInfo,
	shopCartNum:state => state.shopCart.shopCartNum,
}
export default getters