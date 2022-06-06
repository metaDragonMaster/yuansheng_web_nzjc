<template>
	<div id="bottom-footer">
		<div class="limit-max-width flex">
			<img src="@/assets/images/topnavbar/ysl-logo.png" alt="" class="ysl-logo" />
			<ol class="bottom-dl-list-ol">
				<dl v-for="dlItem in dlList" :key="dlItem.dt">
					<dt>{{ dlItem.dt }}</dt>
					<dd v-for="ddItem in dlItem.dds">
						<span @click="ddItem.onClick">{{ ddItem.label }}</span>
					</dd>
				</dl>
			</ol>
			<ol class="qrcode-list-ol">
				<li>
					<img src="@/assets/images/bottomfooter/qrcode.png" alt="" />
					<span>官方公众号</span>
				</li>
				<li>
					<img src="@/assets/images/bottomfooter/qrcode.png" alt="" />
					<span>扫码下载APP</span>
				</li>
			</ol>
		</div>
		<div class="limit-max-width text-center">
			<p class="a-link" @click="$routerUtil.newWindow('https://beian.miit.gov.cn')">湘ICP备2021013450号</p>
			<img src="@/assets/images/bottomfooter/icon.jpg" />
			<span>湘公网安备 43070402001017号</span>
			<!-- www.yuanshengl.com -->
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			dlList: [
				{
					dt: '我要采购',
					dds: [
						{
							label: '化肥',
							onClick: () => {}
						},
						{
							label: '种子',
							onClick: () => {}
						},
						{
							label: '农具',
							onClick: () => {}
						},
						{
							label: '农业服务',
							onClick: () => {}
						},
						{
							label: '发布需求',
							onClick: () => {}
						}
					]
				},
				{
					dt: '我要供货',
					dds: [
						{
							label: '化肥',
							onClick: () => {}
						},
						{
							label: '种子',
							onClick: () => {}
						},
						{
							label: '农具',
							onClick: () => {}
						},
						{
							label: '农业服务',
							onClick: () => {}
						},
						{
							label: '发布需求',
							onClick: () => {}
						}
					]
				},
				{
					dt: '品牌馆',
					dds: [
						{
							label: '优质商家',
							onClick: () => {}
						},
						{
							label: '大牌推荐',
							onClick: () => {}
						},
						{
							label: '热卖商品',
							onClick: () => {}
						},
						{
							label: '如何入驻',
							onClick: () => {}
						}
					]
				},
				{
					dt: '数据中心',
					dds: [
						{
							label: '数据中心',
							onClick: () => {}
						}
					]
				}
			]
		};
	},
	components: {},
	mounted() {},
	methods: {}
};
</script>
<style lang="scss" scoped="scoped">
#bottom-footer {
	// background-color: #21242D;
	// .hr {
	// 	background-color: #717171;
	// 	height: 0.0625rem;
	// 	display: block;
	// 	overflow: hidden;
	// }
	box-shadow: 0 -2px 6px 0 rgba($color: #000000, $alpha: 0.03);
	color: #999999;
	.limit-max-width.flex {
		padding-top: 2.625rem;
		padding-bottom: 2.625rem;
	}
	.limit-max-width.text-center {
		background-color: #f4f5f9;
		padding-top: 2.625rem;
		padding-bottom: 2.625rem;
		font-size: 0.75rem;
		.a-link {
			cursor: pointer;
		}
		p:not(:last-child) {
			margin-bottom: 1rem;
		}
		img {
			width: 1rem;
			height: 1rem;
			margin-top: -4px;
			margin-right: 4px;
		}
	}
	.qrcode-list-ol {
		display: flex;
		img {
			width: 5.625rem;
		}
		li {
			display: flex;
			flex-direction: column;
			margin-left: 1.875rem;
			font-size: 0.75rem;
			text-align: center;
		}
	}
	.ysl-logo {
		width: 11.25rem;
		height: 6.875rem;
		margin-right: 6.25rem;
	}
	.bottom-dl-list-ol {
		display: flex;
		dl {
			&:not(:last-child) {
				margin-right: 5.75rem;
			}
			&:last-child {
				margin-right: 3.625rem;
			}
			dt {
				color: #0d0d0d;
				margin-bottom: 1.875rem;
				font-weight: bold;
			}
			dd {
				font-size: 0.75rem;
				&:not(:last-child) {
					padding-bottom: 1.25rem;
				}
				span {
					cursor: pointer;
					&:hover,
					&:active {
						color: #ff5600;
					}
				}
			}
		}
	}
}
</style>
