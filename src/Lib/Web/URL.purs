module Lib.Web.URL where

foreign import data URL :: Type

foreign import _create :: String -> URL

create :: String -> URL
create = _create

foreign import hash :: URL -> String
foreign import hostname :: URL -> String
foreign import href :: URL -> String
foreign import origin :: URL -> String
foreign import password :: URL -> String
foreign import pathname :: URL -> String
foreign import port :: URL -> String
foreign import protocol :: URL -> String
foreign import search :: URL -> String
foreign import searchParams :: URL -> String
foreign import toJSON :: URL -> String
foreign import toString :: URL -> String
foreign import username :: URL -> String
