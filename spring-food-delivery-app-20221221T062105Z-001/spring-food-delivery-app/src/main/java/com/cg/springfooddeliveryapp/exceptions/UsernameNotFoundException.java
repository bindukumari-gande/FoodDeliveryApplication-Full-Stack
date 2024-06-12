package com.cg.springfooddeliveryapp.exceptions;

public class UsernameNotFoundException extends RuntimeException
{
	public UsernameNotFoundException(String msg)
	{
	 super(msg);
	}
}