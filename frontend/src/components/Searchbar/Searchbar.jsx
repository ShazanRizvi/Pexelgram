import React from 'react'
import './Searchbar.css'
import { Input } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import {  SearchIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/react";
import logo from '../../img/logo.png'
const Searchbar = () => {
  return (
    <div>
      <div className="searchbar">
        <Image
          borderRadius="full"
          boxSize="50px"
          src={logo}
          alt="Logo"
        />

        <div className="search">
          <Input type="text" placeholder="#Explore" size="sm" />

          <div className="searchicon">
            <IconButton
              colorScheme="blue"
              aria-label="Search database"
              size="xs"
              icon={<SearchIcon />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar
