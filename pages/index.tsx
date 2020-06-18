import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";

interface Pokemon {
  entry_number: number;
  pokemon_species: {
    name: string;
  };
}

interface PokemonStaticProps {
  pokemons: Pokemon[];
}

export const getStaticProps: GetStaticProps = async (_) => {
  const pokemons: Pokemon[] = await fetch("https://pokeapi.co/api/v2/pokedex/1")
    .then((serverResponse) => {
      if (serverResponse.ok) {
        return serverResponse.json();
      }
    })
    .then((objectResponse) => {
      return objectResponse.pokemon_entries;
    });

  return { props: { pokemons } };
};

const Home = ({ pokemons }: PokemonStaticProps) => {
  return (
    <>
      <Head>
        <title>Pokénext</title>
      </Head>
      {pokemons && (
        <ul>
          {pokemons.map((pokemon) => (
            <li key={pokemon.entry_number}>{pokemon.pokemon_species.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Home;
