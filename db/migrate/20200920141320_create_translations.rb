class CreateTranslations < ActiveRecord::Migration[6.0]
  def change
    create_table :translations do |t|
      t.references :user, null: false, foreign_key: true
      t.references :translation_request, null: false, foreign_key: true
      t.text :content
      t.string :language

      t.timestamps
    end
  end
end
