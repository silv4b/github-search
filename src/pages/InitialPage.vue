<template>
  <section class="container">
    <form>
      <h4>Buscar Usuários e Repositórios no Github</h4>
      <div class="searchInput">
        <input v-model="gitUser" type="text" placeholder="Usuário do GitHub" />
      </div>
      <div>
        <button @click="sendNameToSearch" type="submit">
          <span class="text">Pesquisar</span>
        </button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'InitialPage',
  data: () => {
    return {
      gitUser: '',
    };
  },
  methods: {
    sendNameToSearch() {
      if (this.gitUser.trim() != '') {
        let data = this.gitUser;
        this.$router.push({
          name: "search",
          params: { data }
        });
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto";
}

input:focus::placeholder {
  opacity: 0%;
  transition: 0.3s ease-in-out;
}

button {
  margin: 1rem;
  width: 16rem;
  height: 2.6rem;
  background: #1b4986;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

button:hover {
  background: #2767a3;
  transition: 0.3s ease-in-out;
}

.text {
  color: white;
}

.searchInput {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease-in-out;
}

.searchInput>input {
  margin: 1rem;
  height: 2rem;
  width: 16rem;
  border-top: 0;
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
  outline: 0;
}

.searchInput>input:focus {
  border-color: #42163A;
  border-bottom: 2 !important;
  /* background: red; */
}

.searchInput>input,
input::placeholder {
  text-align: center;
  transition: 0.3s ease-in-out;
}

.container {
  /* Center vertically and horizontally */
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>