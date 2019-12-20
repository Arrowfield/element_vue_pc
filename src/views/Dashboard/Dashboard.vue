<template>
	<canvas :width="width" :height="height">你的浏览器版本过低，暂不支持canvas，请升级浏览器</canvas>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {}
        },
        mounted() {

        },
        name: "Dashboard",
        computed: {
            ...mapState({
                width: state => state.dashboard.canvasConfig.width,
                height: state => state.dashboard.canvasConfig.height
            })
        },
        watch: {
            caseName(val) {
                if (val) {
                    this.handleFilter({caseName: val})
                }
            },
            projectName(val) {
                if (val) {
                    this.handleFilter({projectName: val})
                }
            },
            taskName(val) {
                if (val) {
                    this.handleFilter({taskName: val})
                }
            },
            creatorName(val) {
                if (val) {
                    this.handleFilter({creatorName: val})
                }
            }
        },
        methods: {
            handleFocus(type) {
                this[type] = ""
            },
            reduceItem(arr) {
                let obj = {};
                arr = arr.reduce(function (item, next) {
                    obj[next.key] ? '' : obj[next.key] = item.push(next);
                    return item;
                }, []);
            },
            handleFilter(obj) {
                this.selected = Object.assign(obj, this.selected)
                this.options = filterArray(this.options, this.array, this.selected)
            },
            handleClick() {

            }
        },

    }
</script>

<style scoped lang="scss">
	.fl-select {
		display: inline-block;
		margin-left: 30px;
		padding: 10px 0;

		label {
			margin-right: 10px;
		}

		select {
			width: 180px;
		}
	}

	.data-svg {
		width: 16rem;
		margin: 1rem auto 0;
	}

	.e-charts {
		width: 16rem;
		margin: 0 auto;
	}
</style>