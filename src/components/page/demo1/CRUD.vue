<template>
  <div>
        <PageTitle BreadTitle="增删改查列表"></PageTitle>
        <SearchForm></SearchForm>
        <List></List>
  </div>
</template>
<script>
import PageTitle from '../../common/PageTitle'
import SearchForm from './SearchForm'
import List from './List'


export default {
  components:{
    PageTitle,
    SearchForm,
    List
  }
}
</script>
<style scoped>

</style>
