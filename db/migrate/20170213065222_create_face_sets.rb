class CreateFaceSets < ActiveRecord::Migration
  def change
    create_table :face_sets do |t|
      t.string :token

      t.timestamps null: false
    end
  end
end
