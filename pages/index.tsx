import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

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
            <li key={pokemon.entry_number}>
              <Link href={`pokemon/${pokemon.entry_number}`}>
                <a>{pokemon.pokemon_species.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Home;
