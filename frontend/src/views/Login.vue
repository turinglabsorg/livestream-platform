<template>
  <div class="home">
    <div class="container">
      <div class="columns">
        <div class="column">
          <b-field label="Username" type="is-success">
            <b-input value="johnsilver" maxlength="30"></b-input>
          </b-field>

          <b-field label="Password">
            <b-input type="password" value="iwantmytreasure" password-reveal>
            </b-input>
          </b-field>
          <br>
          <b-button type="is-primary" expanded>LOGIN</b-button>
        </div>
      </div>
    </div>
  </div>
</template>
