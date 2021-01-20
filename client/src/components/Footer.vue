<template>
  
  <div class="footer">
    <footer class="bg-dark">
      <div class="icones">
        <div class="row"> 
          <div class="col-lg-4">
            <a href= "https://www.hdigitag.fr/fr/ " target="_blank" class=" btn-floating btn-sm btn-fb mx-1 " ><i><img src="images/logoDigitAg-reserve.png" ></i></a>
          </div>
          <div class="col-lg-4">
            <a href="http://www.inrae.fr" target="_blank" class="col-sm-4 btn-floating btn-sm btn-fb mx-1 "><i><img src="images/Logo-INRAE_Transparent.png" ></i></a>
          </div>
          <div class="col-lg-4">
            <a href= "https://muse.edu.umontpellier.fr/" target="_blank" class="col-sm-4 btn-floating btn-sm btn-fb mx-1 "><i><img src="images/Logo_MUSE.png" ></i></a>
          </div>
        </div>
      </div>

      <div class="copyright">
        Copyright &copy; 2020: <a href="https://inrae.fr" target="_blank">  www.inrae.fr </a> | <a href="https://www.hdigitag.fr/fr/" target="_blank"> www.hdigitag.fr</a> & <a  href="#/legalMentions" target="_blank">  Mentions Légales | Politique de confidentialité</a>
      </div>
    </footer>
  </div>
  
    
</template>

<script>
  export default {
    name: 'Footer',
    components: {
    }
  }
</script>

<style scoped>

.footer{
  height: 4em;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  /* overflow: none; */
  
}


img {
  border-radius: 0%;
}

.icones{background: gray;padding: 7px; width: 100%; }
.icones p {text-align:center;}
.icones img {max-width: 5em; height: 2em; }
.icones img:hover {max-width: 6em;height: 2.4em;}

.copyright{background: black; 

  text-align: center;
  font-size: 1em;
  color: white;
  height: 1.3em;
  width: 100%;
}



</style>