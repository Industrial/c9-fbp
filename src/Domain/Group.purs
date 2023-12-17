module Domain.Group where

import Prelude

import Data.Generic.Rep (class Generic)
import Data.Show.Generic (genericShow)
import Domain.Metadata (Metadata)

data Group = Group
  { name :: String
  , nodeIds :: Array String
  , metadata :: Metadata
  }

derive instance genericGroup :: Generic Group _
instance showGroup :: Show Group where
  show = genericShow