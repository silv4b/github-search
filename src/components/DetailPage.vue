<template>
  <section class="">
    <div class="flex-col">
      <h1 @click="backToHome">
        <p style="cursor: pointer;"> Página Detalhada</p>
      </h1>
      <h3>Buscar Usuários e Repositórios no Github</h3>
    </div>
    <!-- <div>
      <div>
        <h1>Buscar Usuários e Repositórios no Github</h1>
        <div class="">
          <input v-model="gitUser" type="text" placeholder="Usuário do GitHub" />
          <label class="label" for="name">Nome</label>
        </div>
        <div class="">
          <button @click="getGitUser(); getReposUser()" type="submit" class="btnSearch">Pesquisar</button>
        </div>
      </div>
    </div> -->
    <div>
      <div class="flex-row profileContainer">
        <img class="profileImg" :src="gitReturnedUserData.avatar_url" />
        <p> {{ gitReturnedUserData.login }}</p>
        <div class="flex">
          <p>{{ gitReturnedUserData.name }}</p>
          <p>{{ gitReturnedUserData.bio }}</p>
        </div>
      </div>
    </div>

    <div>
      <p>Repositórios:</p>
      <span v-for="repository in gitReturnedUserRepos" :key="repository.id">
        {{ repository.name }} <strong>{{ repository.full_name }}</strong><br>
      </span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'DetailPage',
  props: {
    gituserName: String
  },
  data: () => {
    return {
      gitUser: '',
      gitReturnedUserData: '',
      gitReturnedUserRepos: []
    };
  },
  methods: {
    backToHome() {
      this.$router.push("/");
    },
    getGitUser() {
      if (this.gitUser.trim() != '') {
        fetch(`https://api.github.com/users/${this.gitUser}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        })
          .then((response) => {
            response.json().then((x) => (this.gitReturnedUserData = x))
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    getReposUser() {
      if (this.gitUser.trim() != '') {
        fetch(`https://api.github.com/users/${this.gitUser}/repos`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        })
          .then((response) =>
            response.json().then((x) => (this.gitReturnedUserRepos = x))
          )
          .catch((error) => console.log(error))
      }
    }
  },
  mounted() {
    this.gitUser = this.$route.params.data || 'silv4b';
    this.getGitUser();
    this.getReposUser();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section {
  margin: 0 150px 0 150px;
  background: rgb(169, 169, 169);
}

img {
  margin: 2rem;
}

p {
  text-align: left;
  max-width: 30rem;
}


.profileContainer {
  width: 80rem;
}

.flex {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.flex-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.flex-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profileImg {
  width: 10rem;
  border-radius: 100%;
}
</style>
