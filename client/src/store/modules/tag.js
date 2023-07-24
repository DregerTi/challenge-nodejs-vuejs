import * as tagService from '@/services/tagService'
import router from '@/router'

const state = {
    tag: null,
    tags: [],
    tagsErrors: []
}

const getters = {
    tag: (state) => state.tag,
    tags: (state) => state.tags,
    tagsErrors: (state) => state.tagsErrors
}

const actions = {
    async createTag({ commit }, _tag) {
        try {
            const tag = await tagService.createTag(_tag)
            commit('setTag', tag)
            const Tags = await tagService.getTags()
            commit('setTags', Tags)
            await router.push({
                name: 'tag-show',
                params: {
                    site: router.currentRoute.value.params.site,
                    id: tag.id
                }
            })
        } catch (error) {
            commit('setTagsErrors', error)
        }
    },
    async getTags({ commit }) {
        try {
            const tags = await tagService.getTags()
            commit('setTags', tags)
        } catch (error) {
            commit('setTagsErrors', error)
        }
    },
    async updateTag({ commit }, _tag) {
        try {
            const tag = await tagService.updateTag(_tag)
            commit('setTag', tag)
            const tags = await tagService.getTags()
            commit('setTags', tags)
            await router.push({
                name: 'tag-show',
                params: {
                    site: router.currentRoute.value.params.site,
                    id: router.currentRoute.value.params.id
                }
            })
        } catch (error) {
            commit('setTagsErrors', error)
        }
    },
    async deleteTag({ commit }, id) {
        try {
            await tagService.deleteTag(id)
            const tags = await tagService.getTags()
            commit('setTags', tags)
            await router.push({
                name: 'tag',
                params: { site: router.currentRoute.value.params.site }
            })
        } catch (error) {
            commit('setTagsErrors', error)
        }
    },
    async getTag({ commit }, id) {
        try {
            const tag = await tagService.getTag(id)
            commit('setTag', tag)
        } catch (error) {
            commit('setTagsErrors', error)
        }
    }
}

const mutations = {
    setTag(state, tag) {
        state.tag = tag
    },
    setTags(state, tags) {
        state.tags = tags
    },
    setTagsErrors(state, errors) {
        state.tagsErrors = errors
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
