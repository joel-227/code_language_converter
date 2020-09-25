class AddLikesToTranslations < ActiveRecord::Migration[6.0]
  def change
    add_column :translations, :likes, :integer, default: 0
  end
end
