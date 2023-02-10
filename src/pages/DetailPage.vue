<template>
  <section>
    <div class="flex-col">
      <h1 @click="backToHome">
        <p style="cursor: pointer;"> Página Detalhada</p>
      </h1>
    </div>

    <div class="flex-col">
      <div class="flex-row">
        <div class="searchInput">
          <input v-on:keyup.enter="getGitUser" v-model="gitUser" type="text" placeholder="Pesquese um Usuário do GitHub" />
        </div>
      </div>
    </div>

    <div class="flex-col">
      <div class="flex-row profileContainer">
        <img class="profileImg" :src="gitReturnedUserData.avatar_url" />
        <div>
          <p>{{ gitReturnedUserData.login }}</p>
          <p>{{ gitReturnedUserData.name }}</p>
          <p>{{ gitReturnedUserData.bio }}</p>
        </div>
      </div>
    </div>

    <div class="flex-col">
      <div class="table-scroll">
        <table>
          <tr>
            <th class="a-right">Company</th>
            <th>Contact</th>
          </tr>
          <tr v-for="repository in gitReturnedUserRepos" :key="repository.id">
            <td class="a-right">{{ repository.name }}</td>
            <td>
              <a :href="`http://www.github.com/${repository.full_name}/`" target="_blank">{{ repository.full_name }}</a>
            </td>
          </tr>
        </table>
      </div>
      <br>
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
      gitReturnedUserRepos: [],
      userExist: undefined
    };
  },
  methods: {
    backToHome() {
      this.$router.push("/");
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
            if (response.ok) {
              response.json().then((x) => (this.gitReturnedUserData = x));
              this.getReposUser();
            } else {
              alert("deu ruim!");
              this.userExist = false;
            }
          })
          .catch((error) => {
            console.log(error)
          })
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
table {
  border-collapse: collapse;
  width: 50rem;
}

.table-scroll {
  height: 30rem;
  width: 50.6rem;
  overflow: auto;
}

td,
th {
  border: 0 solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #cfe9fd;
}

section {
  margin: 0 150px 0 150px;
}

img {
  margin: 2rem;
}

p {
  text-align: left;
  max-width: 30rem;
}

input:focus::placeholder {
  opacity: 0%;
  transition: 0.3s ease-in-out;
}

.searchInput>input {
  margin: 1rem;
  height: 2rem;
  width: 44rem;
  min-width: 1rem;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-color: #0f72bd;
  outline: 0;
}

button {
  margin: 1rem;
  width: 3rem;
  height: 2.6rem;
  background: #42163A;
  border: none;
  border-radius: 100%;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

button:hover {
  background: #97508a;
  transition: 0.3s ease-in-out;
}

.searchInput>input,
input::placeholder {
  text-align: center;
  transition: 0.3s ease-in-out;
}

.a-left {
  text-align: left;
}

.a-right {
  text-align: right;
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
