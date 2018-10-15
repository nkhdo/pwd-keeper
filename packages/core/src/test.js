const keeper = new PwdKeeper();
keeper.addDomain('google.com');
keeper.addCredential('google.com', 'nkhdo94@gmail.com', 'mysecr3tp@ssw0rd');
keeper.allDomains();
keeper.allCredentials('google.com');
keeper.getCredentialPassword('google.com', 'nkhdo94@gmail.com');
