import { TouchableOpacity, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import Api from "./src/service/api"
import React, { useState } from 'react';

export default function App() {
  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [uf, setUf] = useState("");
  const [ibge, setIbge] = useState("");
  const [ddd, setDdd] = useState("");
  const [botao, setBotao] = useState("Buscar");

  async function buscarCEP(){
    if(botao == "Buscar") {
      if(cep == ""){
        alert("Digite um CEP válido!");
        setCep("");
      } else if(cep.length < 8){
        alert("São necessários 8 números");
        setCep("");
      } else {
        try{
          const response = await Api.get(`/${cep}/json/`)
          setComplemento("Complemento: " + response.data.complemento)
          setLogradouro("Logradouro: " + response.data.logradouro)
          setBairro("Bairro: " + response.data.bairro)
          setLocalidade("Localidade: " + response.data.localidade)
          setUf("UF: " + response.data.uf)
          setIbge("IBGE: " + response.data.ibge)
          setDdd("DDD: " + response.data.ddd)
          setBotao("Nova Busca")
        }catch(error){
          console.log("ERROR" + error)
        }
      }
    } else if(botao == "Nova Busca") {
      setBotao("Buscar")
      setCep("")
      setComplemento("")
      setLogradouro("")
      setBairro("")
      setLocalidade("")
      setUf("")
      setIbge("")
      setDdd("")
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.mapa}
        source={require("./assets/mapa.png")}/>
      <Text style={styles.title}>Busca CEP</Text>
      <TextInput style={styles.cep} value={cep} onChangeText={(texto) => setCep(texto.slice(0, 8))} placeholder="00000-000"></TextInput>
      <TouchableOpacity style={styles.buscar} onPress={buscarCEP}>
        <Text style={styles.buscarTxt}>{botao}</Text>
      </TouchableOpacity>
      <Text style={styles.infos}>{complemento} </Text>
      <Text style={styles.infos}>{logradouro} </Text>
      <Text style={styles.infos}>{bairro} </Text>
      <Text style={styles.infos}>{localidade} </Text>
      <Text style={styles.infos}>{uf} </Text>
      <Text style={styles.infos}>{ibge} </Text>
      <Text style={styles.infos}>{ddd} </Text>
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 40,
    backgroundColor: '#4287f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: "#052f73",
    borderTopWidth: 100,
  },
  mapa: {
    width: 60,
    height: 60,
    marginTop: -190,
  },
  title: {
    color: "#052f73",
    fontWeight: "bold",
    fontSize: 50,
    marginTop: 60,
  },
  cep: {
    borderColor: "#fffff",
    borderWidth: 2,
    color: "#ffffff",
    fontSize: 20,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#052f73",
    fontFamily: "sans-serif",
  },
  buscar: {
    backgroundColor: "#052f73",
    padding: 10,
    borderRadius: 10,
    width: 160,
    margin: 15,
  },
  buscarTxt: {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
  },
  infos: {
    fontFamily: "sans-serif",
    color: "#ffffff",
    marginTop: 15,
  },
});