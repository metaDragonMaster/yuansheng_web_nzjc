<template>
	<div class="pay-button">
		<span><slot></slot></span>
	</div>
</template>
<style lang="scss" scoped="scoped">
.pay-button {
	display: inline-block;
	background-image: linear-gradient(150deg, #71CF37, #71CF37 20%, #008E39 20%, #008E39 80%, #016125 80%, #016125);
	padding: 8px 40px;
	color: #ffffff;
	clip-path: polygon(10% 0, 100% 0%, 90% 100%, 0 100%);
	cursor: pointer;
	transition: clip-path 0.2s;
	&:hover {
		clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 100%);
	}
}
</style>
