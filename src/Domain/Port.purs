module Domain.Port where

import Prelude

import Data.Generic.Rep (class Generic)
import Data.Show.Generic (genericShow)

data Port = Port
  { id :: String
  , name :: String
  }

derive instance genericPort :: Generic Port _
instance showPort :: Show Port where
  show = genericShow