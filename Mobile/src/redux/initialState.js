export const initialState = {
    isLoggedIn: false,
    userId: '',
    token: '',
    refreshToken: '',
    expiresOn: '',
    data: '',
   
  };

export const AdresseState = {

  addrese: '',
  pays :'' ,
  ville : '',
  province : '',
  codePostal : '',
  lat : '',
  long: ''

}

export const MapState = {
  maptype : 'standard',
 
}

export const ModalState = {
  isModalOpen : false,
  isElectrode: false,
}


export const defibMarkers = {
  markers :[],
}

export const defib = {
  
  Defibrilatteur: []

}

export const DefibPosted = {
   defibPosted:[]
}

export const accessibilite = {
  checked:'Non mentionne',
  isPediatrique: 'Non mentionne'
}

export const user = {
  user : {}
}

export const defib_user = {
  
  Defibrilatteur_user: []

}

export const token_registration = {
  token:''
}

export const modified_defib = {}